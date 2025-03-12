import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from '@elastic/elasticsearch';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const ELASTIC_URL = process.env.ELASTIC_URL || "http://localhost:9200";

const client = new Client({ node: ELASTIC_URL });

app.use(express.json());
app.use(cors());


app.get('/', (req: Request, res: Response) => {
    res.json({message: "Hello World!"});
});

app.get('/search', async (req: Request, res: Response): Promise<void> => {
    try {
        const query = req.query.query as string | undefined;
        const searchType = req.query.searchType as string | undefined;

        if (!query) {
            res.status(400).json({error: 'Missing query parameter'});
            return;
        };
        
        const normalizedQuery = query.normalize("NFC").trim();

        let mustQuery: any;

        if (searchType === "free") {
            mustQuery = { 
                match: 
                { 
                    "שם_ראשי.ngram_name": { 
                        "query": normalizedQuery, 
                        "analyzer": "hebrew_ngram_analyzer" 
                    } 
                } 
            };
        } else if (searchType === 'exact') {
            mustQuery = {
                multi_match: {
                    query: normalizedQuery,
                    fields: [  
                        "שם_ראשי.exact_name",
                        "תואר", 
                        "שם_מישני", 
                        "קבוצה", 
                        "קבוצה_נוספת", 
                        "סוג", 
                        "קוד.keyword",
                        "שכונה"
                    ],
                    type: "cross_fields",
                    operator: "or"
                }
            };
        } else if (searchType === 'full') {
            mustQuery = {
                multi_match: {
                    query: normalizedQuery,
                    fields: [  
                        "שם_ראשי.exact_name",
                        "תואר", 
                        "שם_מישני", 
                        "קבוצה", 
                        "קבוצה_נוספת", 
                        "סוג", 
                        "קוד.keyword", 
                        "שכונה"
                    ],
                    type: "phrase"
                }
            };
        } else {
            res.status(400).json({error: 'Invalid search type'});
            return;
        }

        const response = await client.search({
            index: "beer-sheva-streets",
            query: {
                bool: {
                    must: mustQuery,
                    must_not: { term: { isDeleted: true } },
                },
            },
        });

        res.json(response.hits.hits.map(hit => ({
            _id: hit._id,
            ...(hit._source || {})
        })));
    } catch (error: any) {
        console.error("Search Error:", error?.meta?.body || error);
        res.status(500).json({ error: "Internal Server Error", details: error?.meta?.body || error.message });
    }
});

app.put('/delete/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const documentId = req.params.id;

        const response = await client.update({
            index: 'beer-sheva-streets',
            id: documentId,
            doc: { isDeleted: true }
        });

        console.log(`🗑️ Marked as deleted: ${documentId}`);
        res.json({ message: "Record marked as deleted", response });
    } catch (error: any) {
        console.error("Delete Error:", error?.meta?.body || error);
        res.status(500).json({ error: "Internal Server Error", details: error?.meta?.body || error.message });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});