import * as crypto from "crypto";
import * as fs from "fs";
var hashFiles = require("hash-files");
var nodeRsa = require("node-rsa");
import * as jwt from "jsonwebtoken";
import * as path from "path";
import * as q from "q";

import * as packageDiffingUtils from "./package-diffing";

interface ReleaseHookParams {
    appName: string;
    deploymentName: string;
    appStoreVersion: string;
    filePath: string;
}

export function execute(params: ReleaseHookParams): q.Promise<void> {
    return sign(params);
}

var CURRENT_SIGNATURE_VERSION: string = "1.0.0";
var HASH_ALGORITHM: string = "sha256";
var PRIVATE_KEY_PATH: string;

interface CodeSigningClaims {
    version: string;
    // deploymentKey: string;
    // appStoreVersion: string;
    contentHash: string;
}

interface SignedMetadata extends CodeSigningClaims {
    signature: string;
}

// Hashing algorithm:
// 1. Recursively generate a sorted array of format <relativeFilePath>: <sha256FileHash>
// 2. JSON stringify the array
// 2. SHA256-hash the result
function hashFolder(folderPath: string): string {
    return "";
}

function sign(params: ReleaseHookParams): q.Promise<void> {
    // If signature file already exists, throw error
    if (!fs.lstatSync(params.filePath).isDirectory()) {
        // TODO: Make it a directory
    }

    return q.nfcall<string>(hashFiles, {
        algorithm: HASH_ALGORITHM,
        files: [ path.join(params.filePath, "**") ]
    })
        .then((hash: string) => {
            var claims: CodeSigningClaims = {
                version: CURRENT_SIGNATURE_VERSION,
                contentHash: hash
            };

            return q.nfcall<string>(jwt.sign, claims, PRIVATE_KEY_PATH, { algorithm: "RS256" });
        })
        .then((signedJwt: string) => {
            console.log(signedJwt);
            // Write file to disk
        });
}