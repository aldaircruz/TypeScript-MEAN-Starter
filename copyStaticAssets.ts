import * as shell from "shelljs";

const baseDevDirName = "server";
const distDirName = "dist";

shell.cp("-R", `${baseDevDirName}/public/js/lib`, `${distDirName}/public/js/`);
shell.cp("-R", `${baseDevDirName}/public/fonts`, `${distDirName}/public/`);
shell.cp("-R", `${baseDevDirName}/public/images`, `${distDirName}/public/`);
