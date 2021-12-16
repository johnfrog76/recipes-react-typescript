import {Icons} from '../../components/molecules/main-menu/main-menu.component';

export interface iMainNavItem {
    text: string;
    route: string;
    auth: boolean;
    params?: string;
    svgIcon: Icons;
}