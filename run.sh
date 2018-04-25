#!/bin/sh

node ./receive-readability.js
img-resolver/gradlew build
img-resolver/gradlew run
java -jar ./img-resolver/build/libs/img-resolver-0.0.1.jar
node ./send.js
