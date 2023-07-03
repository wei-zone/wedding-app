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
const { appid, description, setting } = config

;(() => {
    program
        .version(version)
        .argument('<privateKeyPath>', 'privateKeyPath')
        .action(async (privateKeyPath) => {
            if (!privateKeyPath) {
                console.warn('privateKeyPath is required')
                return
            }
            const project = new ci.Project({
                appid,
                type: 'miniProgram',
                projectPath: './',
                privateKeyPath,
                ignores: ['node_modules/**/*'],
            })
            try {
                const uploadResult = await ci.upload({
                    project,
                    version,
                    desc: `名称：${description}，版本：${version}`,
                    setting,
                    onProgressUpdate: (res) => console.log('upload', res._msg, res._status),
                })
                console.log('success', uploadResult)
            } catch (e) {
                console.warn('upload fail', e)
                throw e
            }
        });
    program.parse();

})()
