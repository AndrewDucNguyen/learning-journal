# Complete Application Setup with Kubernetes Components

## Overview of K8s Components
- 2 Deploymenty / Pod
- 2 Service
- 1 ConfigMap
- 1 Secret
- Need to create Internal Service for MongoDB to communicate with Pod
    - Does not take external requests

## Browser Request Flow through K8 components
- Request comes from browser, goes to External Service (Mongo Express), Forwards it to Mongo Express pod
- Pod will connect to Interal Service (Mongo DB) getting the URL from ConfigMap, then will forward to Mongo DB pod
- It will then authenticate using the cred in Secrets
