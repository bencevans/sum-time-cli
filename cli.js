#!/usr/bin/env node

const meow = require('meow')
const sumTime = require('sum-time')
const moment = require('moment')

const cli = meow(`
    Usage
      $ sum-time <duration1> <duration2> <duration...>

    Options
      --ms display in miliseconds (no formatting)

    Examples
      $ sum-time 23m 1h
      1h23m
`)

const ms = sumTime.apply(null, cli.input)

if (cli.flags.ms) {
  return console.log(ms)
}

let duration = moment.duration(ms)

let seconds = duration.seconds()
duration = duration.subtract(moment.duration(seconds, 'seconds'))

let minutes = duration.minutes()
duration = duration.subtract(moment.duration(minutes, 'minutes'))

let hours = duration.hours()
duration = duration.subtract(moment.duration(hours, 'hours'))

hours += duration.days() * 24
duration = duration.days(moment.duration(duration.days(), 'days'))


let formatted =''
if (hours || formatted) formatted += hours + 'h'
if (minutes || formatted) formatted += minutes + 'm'
if (seconds) formatted += seconds + 's'

console.log(formatted)
