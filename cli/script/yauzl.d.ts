declare module "yauzl" {
    import * as events from "events";
    import * as stream from "stream";

    export interface IOptions {
        autoClose?: boolean;
        lazyEntries?: boolean;
    }

    export interface IEntry {
        compressedSize: number;
        compressionMethod: number;
        crc32: number;
        externalFileAttributes: number;
        extraFieldLength: number;
        extraFields: any[];
        fileComment: string;
        fileCommentLength: number;
        fileName: string;
        fileNameLength: number;
        generalPurposeBitFlag: number;
        internalFileAttributes: number;
        lastModFileDate: number;
        lastModFileTime: number;
        relativeOffsetOfLocalHeader: number;
        uncompressedSize: number;
        versionMadeBy: number;
        versionNeededToExtract: number;

        getLastModDate(): Date;
    }

    export interface ICallback {
        err?: any;
        zipFile?: ZipFile;
    }

    export interface IOpenReadStreamCallback {
        err?: any;
        stream?: stream.Readable;
    }

    export function dosDateTimeToDate(date: number, time: number): Date;
    export function fromBuffer(buffer: Buffer, callback: ICallback): void;
    export function fromFd(fd: number, callback: ICallback): void;
    export function fromFd(fd: number, options: IOptions, callback: ICallback): void;
    export function open(path: string, callback: ICallback): void;
    export function open(path: string, options: IOptions, callback: ICallback): void;

    export class ZipFile extends events.EventEmitter {
        public close(): void;
        public openReadStream(entry: IEntry, callback: IOpenReadStreamCallback): void;
        public readEntry(): void;
    }
}