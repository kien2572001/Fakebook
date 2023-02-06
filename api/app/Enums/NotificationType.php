<?php

namespace App\Enums;

enum NotificationType: string
{
    case REACTION = 'reaction';
    case COMMENT = 'comment';
    case FOLLOW = 'follow';
    case FRIEND_REQUEST = 'friend_request';
}