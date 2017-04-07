#!/bin/bash
echo $SEKRETPASS 
npm run sekret init $SEKRETPASS
npm run sekret decrypt config/config.json