
import { AdminMocks } from "./admin/AdminMocks";
import { AssistantMocks } from "./assistant/AssistantMocks";
import { StudentMocks } from "./student/StudentMocks";
import { TutorMocks } from "./tutor/TutorMocks";

const mocks: {[key: string]: any} = {
    ...StudentMocks,
    ...TutorMocks,
    ...AdminMocks,
    ...AssistantMocks
};

export async function findMock(url: string) {
    const mockKeys = Object.keys(mocks);
  
    for (const mockKey of mockKeys) {
        const regexPattern = mockKey.replace(/:\w+/g, '([^/]+)');
        const regex = new RegExp(`^${regexPattern}$`);
    
        if (regex.test(url)) {
            return { 
                async json(){
                    return mocks[mockKey];
                }
            }
        }
    }
  
    return null;
}