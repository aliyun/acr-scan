# Scan images in Alibaba Cloud Container Registry Service
Use this GitHub Action to scan images in [Alibaba Cloud Container Registry](https://www.aliyun.com/product/acr). 

```yaml
- uses: denverdino/acr-scan@v0.1.1
  with:
    region-id: '<region id>' # example: cn-hangzhou
    access-key-id: '<access key id>'
    access-key-secret: '<access key secret>'
    repository: '<repository>' # example: test/nginx
    tag: '<tag>' # example: latest
```

Or scan image in ACR EE instance

```yaml
- uses: denverdino/acr-scan@v0.1.1
  with:
    region-id: '<region id>' # example: cn-hangzhou
    access-key-id: '<access key id>'
    access-key-secret: '<access key secret>'
    instance-id: '<registry instance id>'
    repository: '<repository>' # example: test/nginx
    tag: '<tag>' # example: latest
```

Refer to the action metadata file for details about all the inputs: [action.yml](https://github.com/denverdino/acr-scan/blob/master/action.yml)


### Prerequisite
Get the access-key-id and access-key-secret of your container registry 

And add access-key-id and access-key-secret as [secret](https://developer.github.com/actions/managing-workflows/storing-secrets/) in the GitHub repository.
