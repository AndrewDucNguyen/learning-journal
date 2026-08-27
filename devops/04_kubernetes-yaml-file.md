# Kubernetes YAML File

## Overview
 - Configurations have 3 parts
 - Connecting Deployments to Service to Pods
 - Demo

## 3 Parts of K8's config file
- Every K8 config file has 3 parts to it
- Examples:
    - nginx-deployment.yaml
        ```yaml
        apiVersion: apps/v1
        kind: Deployment
        metadata:
            name: nginx-deployment
            labels: ...
        spec:
            replicas: 2
            selector: ...
            tempale: ...
        ```
    - nginx-service.yaml
        ```yaml
        apiVersion: v1
        kind: Service
        metadata:
            name: nginx-service
        spec:
            selector: ...
            ports: ...
        ```
1. Metadata
2. Specification
    - Attributes of "specs" are specific to the kind of component you are creating
    - Service and Deployment have their own specs
    - Every kind of configuration you want to apply to that component
3. Status
    - Automatically generated and added by Kubernetes
    - Kubernetes will always compare desired vs actual state to match up and fixed
- Where does K8s get the status data to automate add/update?
    - Inside the etcd
    - Etcd is the cluster brain and master process
        - Holds the current status of any k8 component 
    - Cluster changes get stored in key value store
- YAML File configuration
    - Strict indentation
        - Can you yaml validator online
    - Store the config file with your code
        - This is the `Infrastructure as code` concept
    - Human friendly data serialization standard for all programming languages

## Template - Blueprint for pods
- Deployment manage pods below them
```text
Deployment manages -> ReplicaSet manages -> Pod is an abstraction of -> Docker Container
```
- Has it's own "metadata" and "spec" section
    - Basically a configuration file inside a configuration file
- This configuration applies to a pod
    - It is a blueprint for a pod
        - Port
        - Image
        - Name of container
        - Etc.

## Connecting Components (Labels & Seletors & Ports)
### Labels & Selectors
- Connection is established using labels and selectors
    - Metadata contains label, spec contains selector
- Meta data/label you give component/pod key-value pair
    - Can be anything you can think of
    - Label will stick to that component/pod
    - This label is matched by the selector to make the connection
- Deployment has its own label and is used by service selector
    - Makes a connection between service and deployment pods
    - Made through selector of label
- Must also configure ports in the configurations

### Ports in Service and Pod
- Service has a port where service is accesible
- Sercice needs to know to which port to forward request and which port the pod is listening
    - targetPort
        - Should make containerPort

## End YAML File
- nginx-deployment.yaml
    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
        name: nginx-deployment
        labels:
            app: nginx
    spec:
        replicas: 2
        selector:
            replicas: 2
            selector:
                matchLabels:
                    app: nginx
        tempale:
            metadata:
            spec:
                containers:
                - name: nginx
                    image: nginx:1.16
                    ports:
                    - containerPort: 8080
    ```
- nginx-service.yaml
    ```yaml
    apiVersion: v1
    kind: Service
    metadata:
        name: nginx-service
    spec:
        selector:
            app: nginx
        ports: 
        - protocol: TCP
            port: 80
            targetPort: 8080
    ```

## Demo
- You have to apply the files using these commands:
1. Apply the deployment: `kubectl apply -f nginx-deployment.yaml`
2. Apply the service: `kubectl apply -f nginx-service.yaml`
- This should make 2 replicas running of pods and a service
- How to validate the service has right pods and forward right port
    - Use `kubectl describe service <service_name>` -> `kubectl describe service nginx-service`
- How to know if IP address is for the correct pod?
    - Use `kubectl get pod -o wide`
        - `-o:` output
        - `wide`: more information
- How to check status
    - `kubectl get deployment nginx-deployment -o yaml > nginx-deployment-result.yaml`
        - Will get the deployment in yaml, the resulting or updated configuration of the deployment (resides in etcd because it stores the status of the whole cluster including every component) and save it inside nginx-deployment-result.yaml
- If you want to copy a deployment you already have you have to get rid of a lot of the generated stuff then create another deployment from that blueprint configuration
