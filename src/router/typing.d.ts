
import { type RouteMeta as VRouteMeta, type _RouteRecordBase as _VRouteRecordBase } from 'vue-router';
declare module 'vue-router' {
    interface _RouteRecordBase extends _VRouteRecordBase {
        /**排序索引 */
        index?: number;
    }

    interface RouteMeta extends VRouteMeta {
        /** 标题 */
        title?: string;
        /** 是否需要缓存 */
        keepAlive?: boolean;
        /** 当前路由namePath 祖先name集合 */
        namePath?: string[];
        /** 当前路由所在的完整路径 */
        fullpath?: string;
        /** 是否固定在标签栏 */
        affix?: boolean;
        /** 菜单图标 */
        icon?: string;
        /** 不在菜单中显示 */
        hidden?: boolean;
        /** 不在面包屑导航中显示 */
        breadcrumb?: boolean;
        /** 设置当前路由高亮的菜单项，值为route fullPath或route name,一般用于详情页 */
        activeMenu?: string;

    }
}
