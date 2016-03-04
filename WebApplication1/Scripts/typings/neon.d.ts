interface statut_id {
    class: string;
    order: any;
    label: string;
}
interface user_id {
    $el: any;
    messages: Array<any>;
    unreads: number;
    status: string;
}

interface NeonChat {
    $current_user: any;
        isOpen: boolean;
        chat_history: Array<any>;
        onsendMessage: (id: string, msg:string,date :Date) => void;

    showChat(animated: boolean): void;
    hideChat(animated: boolean): void;
    toggleChat(animated: boolean, collapse_sidebar: boolean): void;
    open(user_id: any): void;
    close(): void;
    refreshUserIds(): void;
    pushMessage(id: string, msg: string, from: string, time: Date, fromOpponent?: boolean, unread?: boolean): void;
    getStatus(user_id: any): statut_id;
    setStatus(user_id: any, new_status: string): void;
    orderGroups(): void;
    countUnreadMessages(user_id: any): any;
    createGroup(group_name: string, prepend: boolean): any;
    removeGroup(group_id: any, move_users_to_group?: any): void;
    addUser(group_id: any, display_name: string, status: string, prepend: boolean, user_id?: any): any;
    getUser(user_id: any): user_id;
    moveUser(user_id: any,new_group_id: any, prepend: boolean): void;
}
declare var neonChat: NeonChat;

declare module "neonChat" {
    export = neonChat;
}