const core = require('@actions/core');

const ROAClient = require('@alicloud/pop-core').ROAClient;
const RPCClient = require('@alicloud/pop-core').RPCClient;


function getAPIEndpoint(regionId) {
    return `https://cr.${regionId}.aliyuncs.com`
}

async function run() {
    let accessKeyId = core.getInput('access-key-id', { required: true });
    let accessKeySecret = core.getInput('access-key-secret', { required: true });
    let securityToken = core.getInput('security-token', { required: false });
    let regionId = core.getInput('region-id', { required: false });
    let instanceId = core.getInput('instance-id', { required: false });
    let repository = core.getInput('repository', { required: false });
    let tag = core.getInput('tag', { required: false });

    if (accessKeyId.length > 0 && accessKeySecret.length > 0) {
        if (regionId.length == 0) {
            core.setFailed(`Action failed for region-id is missing`);
            return;
        }
        
        let endpoint = getAPIEndpoint(regionId);

        if (instanceId.length == 0) {

            try {
                let client = new ROAClient({
                    accessKeyId,
                    accessKeySecret,
                    securityToken,
                    endpoint: endpoint,
                    apiVersion: '2016-06-07'
                });
                let url = `/repos/${repository}/tags/${tag}/scan`
                console.log(`Scanning image ${repository}/${tag} with url ${url} ...`);

                await client.request('PUT', url)
                console.log(`Scanning image ${repository}/${tag} ...`);
            } catch (err) {
                core.setFailed(`Action failed to scan image with error: ${err}`);
            }
        } else {
            let client = new RPCClient({
                accessKeyId,
                accessKeySecret,
                securityToken,
                endpoint: endpoint,
                codes: ['success'], 
                apiVersion: '2018-12-01'
            });
            let repoId = ""
            try {
                let repo = repository.split("/",2)
                let repoResp = await client.request("GetRepository", {
                    InstanceId: instanceId,
                    RegionId: regionId,
                    RepoStatus: 'NORMAL',
                    RepoName: repo[1],
                    RepoNamespaceName: repo[0]
                });
                repoId = repoResp.RepoId
                console.log(`Found image repository ${repository} with repoId ${repoId}`);
            } catch (err) {
                core.setFailed(`Action failed to find image repository ${repository} with error: ${err}`);
                return;
            }
            try {
                let result = await client.request("CreateRepoTagScanTask", {
                    InstanceId: instanceId,
                    RegionId: regionId,
                    RepoId: repoId,
                    Tag: tag
                });
                let requestId = result.RequestId
                console.log(`Scanning image ${repository}/${tag} with requestId ${requestId} ...`);
            } catch (err) {
                core.setFailed(`Action failed to scan image ${repository}/${tag} with error: ${err}`);
            }
        }
    } else {
        core.setFailed(`access-key-id or access-key-secret is missing`);
    }
}

run().catch(e => core.setFailed(e));
