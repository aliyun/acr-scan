require('./sourcemap-register.js');module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 564:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const core = __webpack_require__(450);

const ROAClient = __webpack_require__(922).ROAClient;
const RPCClient = __webpack_require__(922).RPCClient;


function getAPIEndpoint(regionId) {
    return `https://cr.${regionId}.aliyuncs.com`
}

async function run() {
    let accessKeyId = core.getInput('access-key-id', { required: false });
    let accessKeySecret = core.getInput('access-key-secret', { required: false });
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

/***/ }),

/***/ 450:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 922:
/***/ ((module) => {

module.exports = eval("require")("@alicloud/pop-core");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(564);
/******/ })()
;
//# sourceMappingURL=index.js.map