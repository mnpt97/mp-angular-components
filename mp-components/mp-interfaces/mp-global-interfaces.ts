export interface NavigationItem {
    displayName : string, 
    path: string,
    id: string,
    furtherItems?: NavigationItem[]
    expand ? :boolean
}
