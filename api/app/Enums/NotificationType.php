<?php

namespace App\Enums;

enum NotificationType: string
{
    case REACTION = 'reaction';
    case COMMENT = 'comment';
    case FOLLOW = 'follow';
    case FRIEND_REQUEST = 'friend_request';
    case FRIEND_ACCEPT = 'friend_accept';
    case FRIEND_REJECT = 'friend_reject';
    case GROUP_INVITE = 'group_invite';
}
