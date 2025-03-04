# Pulumi Learning Project

## Overview

This repository contains my learning exercises and experiments with [Pulumi](https://www.pulumi.com/), an infrastructure as code tool that lets you create, deploy, and manage cloud infrastructure using familiar programming languages.

## ⚠️ DISCLAIMER

**This project is NOT intended for production use.**

This repository is solely created for:

- Learning Pulumi concepts and workflows
- Experimenting with different infrastructure configurations
- Understanding infrastructure as code principles
- Personal skill development

## What is Pulumi?

Pulumi is an open-source infrastructure as code tool that allows you to define cloud resources using general-purpose programming languages like:

- JavaScript/TypeScript
- Python
- Go
- .NET (C#, F#)

Instead of using domain-specific languages like HCL (HashiCorp Configuration Language), Pulumi leverages the full power of programming languages to create, deploy, and manage cloud infrastructure.

## Learning Resources

- [Pulumi Documentation](https://www.pulumi.com/docs/)
- [Pulumi Examples](https://github.com/pulumi/examples)
- [Pulumi Community Slack](https://slack.pulumi.com/)

## Pulumi AWS Infrastructure

This project defines AWS infrastructure using Pulumi, including an S3 bucket, Lambda function, and API Gateway.

## Prerequisites

- [Pulumi CLI](https://www.pulumi.com/docs/get-started/install/)
- [Node.js](https://nodejs.org/en/download/)
- [AWS CLI](https://aws.amazon.com/cli/) configured with appropriate credentials

## Setup and Configuration

### Initialize a new Pulumi project (if not already done)

```bash
pulumi new aws-typescript
```

### Configure AWS region

```bash
pulumi config set aws:region us-east-1  # Replace with your preferred region
```

### Install dependencies

```bash
npm install
```

## Deployment Commands

### Preview changes before deployment

```bash
pulumi preview
```

### Deploy infrastructure

```bash
pulumi up
```

### Deploy with automatic approval (no confirmation prompts)

```bash
pulumi up --yes
```

## Stack Management

### List stacks

```bash
pulumi stack ls
```

### Select a different stack

```bash
pulumi stack select dev  # Replace 'dev' with your stack name
```

### Create a new stack

```bash
pulumi stack init production  # Creates a new 'production' stack
```

## Output Management

### View stack outputs

```bash
pulumi stack output
```

### Get a specific output value

```bash
pulumi stack output url
```

## Resource Management

### View resources in the current stack

```bash
pulumi stack
```

### Refresh the state of resources

```bash
pulumi refresh
```

## Cleanup Commands

### Destroy infrastructure

```bash
pulumi destroy
```

### Destroy with automatic approval

```bash
pulumi destroy --yes
```

### Remove a stack (after destroying resources)

```bash
pulumi stack rm dev  # Replace 'dev' with your stack name
```

## Advanced Commands

### Export stack deployment to a file

```bash
pulumi stack export --file=backup.json
```

### Import stack deployment from a file

```bash
pulumi stack import --file=backup.json
```

### Get history of updates

```bash
pulumi history
```

### Cancel an ongoing update

```bash
pulumi cancel
```

### Run a specific update

```bash
pulumi up --target=aws:s3/bucket:Bucket::my-bucket  # Update only the S3 bucket
```

## License

This project is for personal educational use only.
