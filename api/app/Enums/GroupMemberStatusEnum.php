<?php

namespace App\Enums;

enum GroupMemberStatusEnum: string
{
    case ACCEPTED = 'accepted';
    case INVITED = 'invited';
    case REQUESTED = 'requested';
    case REJECTED = 'rejected';
}
