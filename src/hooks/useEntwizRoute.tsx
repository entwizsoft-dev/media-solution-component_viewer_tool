import { useRouter } from 'next/router';

//컴포넌트 라우트 기능
interface IEntwizRouterProps {
    url?: string;
    templateUrl?: string;
    blank?: boolean;
}

const useEntwizRoute = () => 
{
    const router = useRouter();
    const push = (type: string, option: IEntwizRouterProps) => 
    {
        if(true)
        {
            if(type === 'externalLink')
            {
                if(option.url)
                {
                    if(option.blank)
                    {
                        window.open(option.url);
                    }
                    else
                    {
                        return router.push(option.url);
                    }
                }
            }
            else if(type === 'layoutTemplate')
            {
                if(option.templateUrl)
                {
                    if(option.blank)
                    {
                        window.open(option.templateUrl);
                    }
                    else
                    {
                        return router.push(option.templateUrl);
                    }
                }
            }
        }
    };


    return Object.freeze({
        push,
    });
};

export default useEntwizRoute;