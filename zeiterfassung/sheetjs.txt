import * as XLSX from 'xlsx';

import * as fs from 'fs';
XLSX.set_fs(fs);

import { Readable } from 'stream';
XLSX.stream.set_readable(Readable);