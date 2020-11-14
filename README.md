# Scan Docker images in Alibaba Cloud Container Registry
Use this GitHub Action to scan Docker images in [Alibaba Cloud Container Registry](https://www.aliyun.com/product/acr). 


Scan image in ACR default instance

```yaml
- uses: aliyun/acr-scan@v1
  with:
    region-id: '<region id>' # example: cn-hangzhou
    access-key-id: '<access key id>'
    access-key-secret: '<access key secret>'
    repository: '<repository>' # example: test/nginx
    tag: '<tag>' # example: latest
```

Or scan image in specific ACR EE instance

```yaml
- uses: aliyun/acr-scan@v1
  with:
    region-id: '<region id>' # example: cn-hangzhou
    access-key-id: '<access key id>'
    access-key-secret: '<access key secret>'
    instance-id: '<registry instance id>'
    repository: '<repository>' # example: test/nginx
    tag: '<tag>' # example: latest
```

Refer to the action metadata file for details about all the inputs: [action.yml](https://github.com/aliyun/acr-scan/blob/master/action.yml)


### Prerequisite
Get the access-key-id and access-key-secret of Alibaba Cloud, and add them as [secrets](https://developer.github.com/actions/managing-workflows/storing-secrets/) in the GitHub repository.
