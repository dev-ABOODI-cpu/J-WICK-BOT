import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class UltraDB {
    #path;
    #saveTimer = null;
    
    constructor() {
        this.#path = path.join(__dirname, 'database.json');
        
        const dir = path.dirname(this.#path);
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
        
        this.data = this.#load();
        return this.#createProxy();
    }
    
    #load() {
        try {
            if (existsSync(this.#path)) {
                const raw = readFileSync(this.#path, 'utf-8');
                if (raw.trim()) {
                    const parsed = JSON.parse(raw);
                    // التأكد من تهيئة الهياكل الأساسية والجديدة
                    if (!parsed.groups) parsed.groups = {};
                    if (!parsed.users) parsed.users = {};
                    if (!parsed.subBots) parsed.subBots = {}; // دعم البوتات الفرعية
                    if (parsed.dev === undefined) parsed.dev = false;
                    return parsed;
                }
            }
        } catch (e) {
            console.error("خطأ في تحميل قاعدة البيانات:", e.message);
        }
        return { groups: {}, users: {}, subBots: {}, dev: false };
    }
    
    #save() {
        if (this.#saveTimer) clearTimeout(this.#saveTimer);
        this.#saveTimer = setTimeout(() => {
            try {
                writeFileSync(this.#path, JSON.stringify(this.data, null, 2));
            } catch (e) {
                console.error("خطأ في حفظ قاعدة البيانات:", e.message);
            }
            this.#saveTimer = null;
        }, 50);
    }
    
    #isValidId(id) {
        return id && !id.includes('@newsletter') && !id.includes('@lid') && id.includes('@');
    }
    
    #createProxy() {
        const self = this;
        
        return new Proxy(this.data, {
            get(target, prop) {
                // معالجة الأقسام الرئيسية (groups, users, subBots)
                if (prop === 'groups' || prop === 'users' || prop === 'subBots') {
                    if (!target[prop]) target[prop] = {};
                    const subTarget = target[prop];
                    
                    return new Proxy(subTarget, {
                        get(innerTarget, id) {
                            if (!self.#isValidId(id)) return undefined;
                            
                            if (!innerTarget[id]) {
                                // تخصيص قيم افتراضية للبوتات الفرعية عند أول ظهور لها
                                if (prop === 'subBots') {
                                    innerTarget[id] = { 
                                        autoReply: true, 
                                        privateChat: true, 
                                        antiSpam: false,
                                        prefix: '.',
                                        status: 'online'
                                    };
                                } else {
                                    innerTarget[id] = {};
                                }
                                self.#save();
                            }
                            
                            return new Proxy(innerTarget[id], {
                                set(obj, key, val) {
                                    // تعديل منطق الحفظ: لا نحذف القيمة إذا كانت false للسماح بمفاتيح الـ toggle
                                    if (val === undefined || val === null) {
                                        delete obj[key];
                                    } else {
                                        obj[key] = val;
                                    }
                                    self.#save();
                                    return true;
                                },
                                deleteProperty(obj, key) {
                                    delete obj[key];
                                    self.#save();
                                    return true;
                                }
                            });
                        },
                        set(innerTarget, id, val) {
                            if (!self.#isValidId(id)) return false;
                            innerTarget[id] = val;
                            self.#save();
                            return true;
                        },
                        deleteProperty(innerTarget, id) {
                            delete innerTarget[id];
                            self.#save();
                            return true;
                        }
                    });
                }
                
                if (prop === 'dev') return target.dev;
                return target[prop];
            },
            
            set(target, prop, val) {
                // منع التلاعب المباشر بالأقسام الرئيسية لضمان عمل الـ Proxy
                if (['groups', 'users', 'subBots'].includes(prop)) return false;
                target[prop] = val;
                self.#save();
                return true;
            }
        });
    }
}

export default UltraDB;
