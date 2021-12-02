import * as fs from "fs";
import * as path from "path";
import { app } from "electron";

let workDir = app.getPath("userData") + path.sep + "WorkDir";
let appDir = workDir + path.sep + "Apps";
let relationshipsDir = workDir + path.sep + "Relationships";

export function loadAppsFromWorkDirectory() {
    if (!fs.existsSync(workDir))
    {
        fs.mkdirSync(workDir, {recursive: true});
    }

    if (!fs.existsSync(appDir))
    {
        fs.mkdirSync(appDir, {recursive: true});
    }
    const appFiles = fs.readdirSync(appDir);
    const rawApps = [] as Array<Object>;
    for(const appFile of appFiles)
    {
        const appName = appFile.split(".")[0];
        const content = fs.readFileSync(appDir + path.sep + appFile, "utf8");
        rawApps.push({name: appName, src: content})
    }

    return rawApps;
}

export function saveAppToWorkDirectory(appData: any) {
    const savePath = appDir + path.sep + appData.name + ".viot";
    fs.writeFileSync(savePath, appData.src);
}

export function deleteAppFromWorkDirectory(appName: string) {
    const fileToDelete = appDir + path.sep + appName + ".viot";
    if (fs.existsSync(fileToDelete))
    {
        fs.rmSync(fileToDelete);
    }
}

export function saveRelationship(relationshipData: any) {
    const savePath = relationshipsDir + path.sep + relationshipData.name + ".rl";
    fs.writeFileSync(savePath, relationshipData.jsonData);
}

export function loadRelationships() {
    if (!fs.existsSync(workDir))
    {
        fs.mkdirSync(workDir, { recursive: true });
    }

    if (!fs.existsSync(relationshipsDir))
    {
        fs.mkdirSync(relationshipsDir, { recursive: true });
    }

    const relationshipFiles = fs.readdirSync(relationshipsDir);
    const rawRelationships = [] as Array<Object>;
    for(const relationshipFile of relationshipFiles)
    {
        const relName = relationshipFile.split(".")[0];
        const jsonData = fs.readFileSync(relationshipsDir + path.sep + relationshipFile, "utf8");
        rawRelationships.push({ name: relName, jsonData: jsonData })
    }

    return rawRelationships;
}