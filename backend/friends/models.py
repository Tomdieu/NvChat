from django.db import models

from account.models import UserProfile

# Create your models here.


class FriendList(models.Model):
    user = models.OneToOneField(
        UserProfile, on_delete=models.CASCADE, related_name="friend_list"
    )

    friends = models.ManyToManyField(UserProfile, blank=True, related_name="friends")

    def __str__(self) -> str:
        return f"{self.user.user}"

    def add_friend(self, account: UserProfile):
        """
        A a new friend
        """
        if account not in self.friends.all():
            self.friends.add(account)
            self.save()

    def remove_friend(self, account: UserProfile):
        """
        Remove a friend
        """
        if account not in self.friends.all():
            self.friends.remove(account)

    def unfriend(self, removee: UserProfile):
        """
        Initiate the action of unfriending someone
        """

        remover_friends_list = self

        remover_friends_list.remove_friend(removee)

        friends_list = FriendList.objects.get(user=removee)

        friends_list.remove_friend(self.user)

    def is_mutual_friend(self, friend: UserProfile):
        """
        Is this a friend?
        """

        if friend in self.friends.all():
            return True
        return False


class FriendRequest(models.Model):
    """
    A friend request consits of two main parts:
        1 Sender:
        - Person sending/ initiating the friend request
        2 Reciever :
        - Person recieving the friend request
    """

    sender = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="friend_sender"
    )
    reciever = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="friend_reciever"
    )

    is_active = models.BooleanField(blank=True, null=True, default=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.sender} send friend request to {self.reciever}"

    def accept(self):
        """
        Accept a friend request
        updated both sender and reciever friends lists
        """

        reciever_friend_list = FriendList.objects.get(user=self.reciever)
        if reciever_friend_list:
            reciever_friend_list.add_friend(self.sender)
            sender_friend_list = FriendList.objects.get(user=self.sender)

            if sender_friend_list:
                sender_friend_list.add_friend(self.reciever)
                self.is_active = False
                self.save()

    def decline(self):
        """
        Decline a friend request.
        It is 'decline' by setting the is_ictive field to False
        """

        self.is_active = False
        self.save()

    def cancel(self):
        """
        Cancel A friend request
        It is 'cancel' by setting the is_ictive field to False

        """

        self.is_active = False
        self.save()
