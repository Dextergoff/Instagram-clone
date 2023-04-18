from django import dispatch

newpassword_validated = dispatch.Signal("data")

email_validated = dispatch.Signal("data")
