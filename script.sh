#!/bin/sh
filename=$(curl -sL https://ipa.aspy.dev/discord/stable/ | grep ipa | tail -n 2 | cut -f 2 -d '>' | cut -f 1 -d '<')
node index.js "https://ipa.aspy.dev/discord/stable/${filename:1}"