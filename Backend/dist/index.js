"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const cors_1 = __importDefault(require("cors"));
const exceljs_1 = __importDefault(require("exceljs"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const schema = zod_1.z.string().length(10, {
    message: "String must be exactly 10 characters long."
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/formA', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield prisma.formA.findMany({});
        res.json({ forms });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch forms' });
    }
}));
app.post('/formA', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Country, PhoneNumber } = req.body;
        if (!Name || !Country || !PhoneNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const result = schema.safeParse(PhoneNumber);
        if (result.success) {
            yield prisma.formA.create({
                data: {
                    Name,
                    Country,
                    PhoneNumber
                },
            });
            res.status(201).json({ msg: 'successful' });
        }
        else {
            res.status(404).json({ msg: "Wrong Number" });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create form' });
        console.log("hello");
    }
}));
app.get('/formB', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield prisma.formB.findMany({});
        res.json({ forms });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch forms' });
    }
}));
app.post('/formB', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Country, PhoneNumber } = req.body;
        if (!Name || !Country || !PhoneNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const result = schema.safeParse(PhoneNumber);
        if (result.success) {
            yield prisma.formB.create({
                data: {
                    Name,
                    Country,
                    PhoneNumber
                },
            });
            res.status(201).json({ msg: 'successful' });
        }
        else {
            res.status(404).json({ msg: "Wrong Number" });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create form' });
    }
}));
// Endpoint to export data to Excel
app.get('/export', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formAData = yield prisma.formA.findMany({});
        const formBData = yield prisma.formB.findMany({});
        const workbook = new exceljs_1.default.Workbook();
        const sheetA = workbook.addWorksheet('FormA');
        const sheetB = workbook.addWorksheet('FormB');
        sheetA.columns = Object.keys(formAData[0]).map(key => ({ header: key, key }));
        sheetB.columns = Object.keys(formBData[0]).map(key => ({ header: key, key }));
        formAData.forEach(data => sheetA.addRow(data));
        formBData.forEach(data => sheetB.addRow(data));
        const buffer = yield workbook.xlsx.writeBuffer();
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
        res.send(buffer);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to export data to Excel' });
    }
}));
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
