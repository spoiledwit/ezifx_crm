const filterDataBySearch = (dataList: any[], search: string, keysToSearch: string[], setDataFn: React.Dispatch<any>) => {
    const filteredData = dataList.filter(item => {
        return keysToSearch.some(key => {
            const keyParts = key.split('.'); // Split the key by dot to access nested properties
            let value = item;
            for (let part of keyParts) {
                value = value[part]; // Access each nested level
                if (value === undefined) {
                    return false; // If any level is undefined, the property does not exist
                }
            }
            return value.toString().toLowerCase().includes(search.toLowerCase());
        });
    });

    setDataFn(filteredData);
};


export default filterDataBySearch;