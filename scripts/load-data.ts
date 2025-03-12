import fs from 'fs';
import csvParser from 'csv-parser';
import { Client } from '@elastic/elasticsearch';

const client = new Client({ node: 'http://localhost:9200' });


const CSV_FILE_PATH = './data/streets.csv';
const INDEX_NAME = 'beer-sheva-streets';

interface StreetRecord {
    "שכונה": string;
    "קוד": number | null;
    "סוג": string;
    "קבוצה_נוספת": string;
    "קבוצה": string;
    "שם_מישני": string;
    "תואר": string;
    "שם_ראשי": string;
    "isDeleted": boolean;
}

async function loadCSV() {
    const stream = fs.createReadStream(CSV_FILE_PATH).pipe(csvParser({
        mapHeaders: ({ header }) => header.trim()
    }));

    for await (const row of stream) {
        if (Object.values(row).every((value) => {
            const typedValue = value as string | number | boolean;
            return !typedValue || typeof typedValue === 'string' && !typedValue.trim();
        })) {
            continue;   
        }

        const record: StreetRecord = {
            "שכונה": row["שכונה"] || "",
            "קוד": row["קוד"] && !isNaN(parseInt(row["קוד"], 10)) ? parseInt(row["קוד"], 10) : null,
            "סוג": row["סוג"] || "",
            "קבוצה_נוספת": row["קבוצה נוספת"] || "",
            "קבוצה": row["קבוצה"] || "",
            "שם_מישני": row["שם מישני"] || "",
            "תואר": row["תואר"] || "",
            "שם_ראשי": row["שם ראשי"] || "",
            "isDeleted": false,
        };

        await client.index({
            index: INDEX_NAME,
            document: record,
        });

        console.log(`Indexed: ${record["שם_ראשי"]}`);
    }

    console.log('Data loaded successfully!');
}

loadCSV().catch(console.error);