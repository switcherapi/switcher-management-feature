***

<div align="center">
<b>Switcher Management Feature Service</b><br>
Feature Flag Service for Switcher Management<br><br>
</div>

<div align="center">

[![Master CI](https://github.com/switcherapi/switcher-management-feature/actions/workflows/master.yml/badge.svg)](https://github.com/switcherapi/switcher-management-feature/actions/workflows/master.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=switcherapi_switcher-management-feature&metric=alert_status)](https://sonarcloud.io/dashboard?id=switcherapi_switcher-management-feature)
[![Docker Hub](https://img.shields.io/docker/pulls/trackerforce/switcher-management-feature.svg)](https://hub.docker.com/r/trackerforce/switcher-management-feature)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Slack: Switcher-HQ](https://img.shields.io/badge/slack-@switcher/hq-blue.svg?logo=slack)](https://switcher-hq.slack.com/)

</div>

***

# About

This is a feature flag service for [Switcher Management](https://github.com/switcherapi/switcher-management). A microservice that is part of the Switcher API Cloud-hosted ecosystem.<br>
It uses [Oak](https://deno.land/x/oak) as middleware framework and [Switcher4Deno](https://deno.land/x/switcher4deno) as the feature flag client SDK to communicate with [Switcher API](https://github.com/switcherapi/switcher-api)

# Getting Started

## Prerequisites

- [Deno](https://deno.land/#installation)
- [Switcher API](https://cloud.switcherapi.com) account

## Running (local)

```bash
deno task run
```

## Running (docker)

```bash
docker-compose up -d
```

## Usage: Postman

1. Import the environment [SM Feature (dev).postman_environment.json](https://raw.githubusercontent.com/switcherapi/switcher-management-feature/master/resources/SM%20Feature%20(dev).postman_environment.json) file into Postman
2. Import the collection [Switcher Management Feature.postman_collection.json](https://raw.githubusercontent.com/switcherapi/switcher-management-feature/master/resources/Switcher%20Management%20Feature.postman_collection.json) file into Postman

## Usage: Swagger

1. Run the application
2. Open [Swagger Editor](https://editor.swagger.io/)
3. Click on File, Import URL using http://localhost:4000/swagger.json