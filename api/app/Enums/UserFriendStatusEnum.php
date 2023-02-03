<?php

namespace App\Enums;

enum UserFriendStatusEnum: string
{
    case ACCEPTED = 'accepted';
    case PENDING = 'pending';
    case REJECTED = 'rejected';
}