<?php

namespace App\Enums;

enum GroupMemberRole: string
{
    case ADMIN = 'admin';
    case MEMBER = 'member';
}
