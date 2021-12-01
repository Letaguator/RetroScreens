import * as fs from "fs";
import * as path from "path";
import { app } from "electron";

let workDir = app.getPath("userData") + path.sep + "WorkDir";
let appDir = workDir + path.sep + "Apps";

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
    fs.writeFileSync(appDir + path.sep + appData.name + ".viot", appData.src);
}