const express = require('express')
const router = express.Router()
const AuthRoute = require('./auth.route')
const PublicRoute = require('./public.route')
const MemberRoute = require('./member.route')

// Public Route
router.use('/', PublicRoute)

// Auth Route
router.use('/auth', AuthRoute)

// Member Route
router.use('/member', MemberRoute)

module.exports = router