interface Env {
    bgkv: KVNamespace;
    bgdb: D1Database;
    JWT_SECRET: string;
    LINUXDO_CLIENT_ID: string;
    LINUXDO_CLIENT_SECRET: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    // 跳过 Linux.do 登录，直接返回成功，绕过登录界面
    return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
    });
};
