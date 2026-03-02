// за бъдещи листове при нарастване от нуждата за refresh

import { useCallback, useEffect, useState } from "react"

export const useScreenLoaderRefresh = (loader) => {
    const [loading, setLoading] = useState(false);

    const reload = useCallback(async () => {
        setLoading(true);
        await loader();
        setLoading(false);
    }, [loader]);
    
    useEffect(() => {
        reload();
    },[reload]);

    return { loading, reload };
};