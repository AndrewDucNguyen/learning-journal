# Kubernetes YAML File

## Overview
 - Configurations have 3 parts
 - Connectin Deployments to Service to Pods
 - Demo

## 3 Parts of K8's config file
- Every K8 config file has 3 parts to it
- Examples:
    - niginx-deployment.yaml
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
    - Attributes of "specs" are specific to the kind
    - Service and Deployment have their own specs
3. Status
    - Automatically generated and added by Kubernetes
    - Kubernetes will always compared desired vs actual to match up and fixed
- Where does K8s get the status data?
    - Inside the etcd
    - Etcd is the cluster brain
    - Cluster changes get stored in key value store
- YAML File confiuration
    - Strict indentation
    - Store the config file with your code
    - Human friendly data serialization standard for all programming languages

## Template
- Has it's own "metadata" and "spec" section
- Applies to pod
- Blueprint for a pod
    - Port
    - Image
    - Name of container
    - Etc.

## Connecting Components (Labels & Seletors & Ports)