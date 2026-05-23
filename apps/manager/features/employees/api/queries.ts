import { useQuery } from '@tanstack/react-query';
import { employeeKeys } from './queryKeys';
import { employeesService } from './services';
import { toEmployee } from './mappers';
import type { EmployeesQueryParams } from '../types';

export const useEmployees = (params: EmployeesQueryParams) =>
  useQuery({
    queryKey: employeeKeys.list(params.restaurantId ?? 0),
    queryFn: () => employeesService.list(params),
    select: (data) => data.map(toEmployee),
    enabled: params.restaurantId !== null,
  });
