/**
 * @Author: forguo
 * @Date: 2023/7/3 11:41
 * @Description: deploy.js
 */
const program = require('commander');
const ci = require('miniprogram-ci')
const pkg = require('./package.json')
const config = require('./project.config.json')

const { version } = pkg
const { appid, projectname } = config

;(() => {
    program
        .version(version)
        .argument('<privateKey>', 'privateKey')
        .action(async (privateKey) => {
            if (!privateKey) {
                console.warn('privateKey is required')
                return
            }
            const project = new ci.Project({
                appid,
                type: 'miniProgram',
                projectPath: './',
                privateKey,
                ignores: ['node_modules/**/*'],
            })
            const uploadResult = await ci.upload({
                project,
                version,
                desc: `名称：${decodeURIComponent(projectname)}\n版本：${version}\n提交时间：${new Date().toLocaleString()} `,
                setting: {},
                onProgressUpdate: console.log,
            })
            console.log('success', uploadResult)
        });
    program.parse();

})()
