# Helm/Helm Chart

## Helm
- Helm is like a package manager such as homebrew etc.
- Bundles YAML files
- You create your own Helm Chart with Helm
- Templating Engine

## Helm Charts
- Download and use existing ones
- Push them to Helm Repository
- Examples:
    - Database Apps
    - Monitoring Apps
    - Etc. you can reuse configuration that someone has made
- Deploy a kubernetes cluster

## Helm Chart Structure
- Top level `dolos-file-ingest` folder -> name of chart
- Chart.yaml -> meta info about chart
    - Name
    - Dependencies
    - Version
- Values.yaml - Values for the template files
    - Default values you can override
- Charts folder -> chart dependencies
- Templates folder -> The actual template files
    - Template files will be filled with the values form values.yaml
- Command to install: `helm install <chartname>`
