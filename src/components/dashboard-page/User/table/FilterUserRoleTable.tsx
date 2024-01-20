import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
} from '@/components/ui/dropdown-menu';

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const userRoles = ['admin', 'user'];

const FilterUserRoleTable = ({ children }: { children: React.ReactNode }) => {
    const [queryParameters, setQueryParams] = useSearchParams();
    const [role, setRole] = useState('');

    const handleOnValueChange: ((value: string) => void) | undefined = (
        value
    ) => {
        if (role === value) {
            queryParameters.delete('page');
            queryParameters.delete('role');
            setQueryParams(queryParameters);
            return setRole(() => '');
        }

        setRole(() => value);
        queryParameters.delete('page');
        queryParameters.set('role', value);
        setQueryParams(queryParameters);
    };

    return (
        <DropdownMenu>
            {children}

            <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                    value={role}
                    onValueChange={handleOnValueChange}
                >
                    {userRoles.map((role) => {
                        return (
                            <DropdownMenuRadioItem key={role} value={role}>
                                {role}
                            </DropdownMenuRadioItem>
                        );
                    })}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default FilterUserRoleTable;
