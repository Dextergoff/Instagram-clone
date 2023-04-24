from django import dispatch

post_created = dispatch.Signal("post")

like_added = dispatch.Signal()

