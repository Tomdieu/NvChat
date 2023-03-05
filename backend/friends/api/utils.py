from friends.models import FriendRequest


def get_friend_request_or_false(sender, reciever):
    try:
        return FriendRequest.objects.get(
            sender=sender, reciever=reciever, is_active=True
        )
    except:
        return False
