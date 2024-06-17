import { PrismaClient } from '@prisma/client';
import express from 'express';
import { z } from "zod";
import cors from 'cors';
import ExcelJS from 'exceljs';

const prisma = new PrismaClient();
const app = express();
const schema = z.string().length(10, {
    message: "String must be exactly 10 characters long."
  });


app.use(express.json());
app.use(cors());

app.get('/formA', async (req, res) => {
    try {
        const forms = await prisma.formA.findMany({});
        res.json({ forms });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch forms' });
    }
});

app.post('/formA', async (req, res) => {
    try {
        const { Name, Country, PhoneNumber } = req.body;
        if (!Name || !Country || !PhoneNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const result = schema.safeParse(PhoneNumber);
        if(result.success){
            await prisma.formA.create({
                data: {
                    Name,
                    Country,
                    PhoneNumber
                },
            });
            
            res.status(201).json({ msg: 'successful' });
        }else{
            res.status(404).json({msg : "Wrong Number"})
        }
       
    } catch (error) {
        res.status(500).json({ error: 'Failed to create form' });
        console.log("hello");
    }
});

app.get('/formB', async (req, res) => {
    try {
        const forms = await prisma.formB.findMany({});
        res.json({ forms });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch forms' });
    }
});

app.post('/formB', async (req, res) => {
    try {
        const { Name, Country, PhoneNumber } = req.body;
        if (!Name || !Country || !PhoneNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const result = schema.safeParse(PhoneNumber);
        if(result.success){
            await prisma.formB.create({
                data: {
                    Name,
                    Country,
                    PhoneNumber
                },
            });
            res.status(201).json({ msg: 'successful' });
        }
        else{
            res.status(404).json({msg : "Wrong Number"})
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to create form' });
    }
});

// Endpoint to export data to Excel
app.get('/export', async (req, res) => {
    try {
        const formAData = await prisma.formA.findMany({});
        const formBData = await prisma.formB.findMany({});
        
        const workbook = new ExcelJS.Workbook();
        const sheetA = workbook.addWorksheet('FormA');
        const sheetB = workbook.addWorksheet('FormB');

        sheetA.columns = Object.keys(formAData[0]).map(key => ({ header: key, key }));
        sheetB.columns = Object.keys(formBData[0]).map(key => ({ header: key, key }));

        formAData.forEach(data => sheetA.addRow(data));
        formBData.forEach(data => sheetB.addRow(data));

        const buffer = await workbook.xlsx.writeBuffer();
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
        
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to export data to Excel' });
    }
});

// Serve the HTML interface
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Refresh Excel</title>
        </head>
        <body>
            <button onclick="refreshData()">Refresh</button>
            <script>
                async function refreshData() {
                    const response = await fetch('/export');
                    if (response.ok) {
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = 'data.xlsx';
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                        alert('Excel sheet updated successfully!');
                    } else {
                        alert('Error updating Excel sheet.');
                    }
                }
            </script>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
