<?php

namespace App\Enums;

enum GroupMemberStatusEnum: string
{
    case ACCEPTED = 'accepted';
    case PENDING = 'pending';
    case REJECTED = 'rejected';
}
