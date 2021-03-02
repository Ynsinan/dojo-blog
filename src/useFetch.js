import { useState, useEffect } from 'react';

//Home.js içinden gönderdiğim urlyi burada kullanarak verimizi çekip Home.js'ye aktaracağız.
const useFetch = (url) => {


    //Bu stateler daha önceden Home.js'nin içindeydi kullanım ve anlaşılabilirlik açısından ayrı bir yapı haline getirdik.
    //Daha sonra Home.js içinde tanımlı olan stateleri useFetch.js içine taşıdık.
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    //Ardından useEffect fonksiyonumuz da aynı şekilde Home.js içindeydi karmaşıklığı azaltmak adına onu da useFetch.js içine aldık ardından
    //Home.jsden gelen url parametremizi aşağıdaki işlemlere tabii tutuyoruz.
    useEffect(() => {

        //useEffect CleanUp 
        const abortCont = new AbortController();


        setTimeout(() => {

            // npx json-server --watch data/db.json --port 8000 komutlarıyla yazdığımız db.json dosyasını online hale getiriyoruz. 
            // Daha sonra http://localhost:8000/blogs bağlantısından aldığımız .json dosyasını aşağıda fetch ediyoruz.
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    console.log(res);
                    //Yukarıdaki log ifadesi ile tarayıcıda incele moduna geçtiğimiz de ok:true diye bir değer göreceğiz.Bunun anlamı veri alındı anlamına geliyor

                    //Ve aşağıda if şartında ok:false olursa bir hata mesajı fırlatmak için yazdık
                    if (!res.ok) {
                        throw Error('Could not fetch the data for that resource');
                    }
                    return res.json()
                })
                .then(data => {
                    //Bu kısımda datayı ulaşılabilir hala getiriyoruz.
                    console.log(data);
                    setIsPending(false);
                    setData(data);
                    setError(null);
                })
                .catch((error) => {
                    //Yukarıda if blogunun içinde fırlattığımız throw değerini consolda gösterir.
                    // console.log(error.message);

                    //Bizim sebep olduğumuz hızlı şekilde home ve tekrardan new blog butonuna hızlı şekilde click attığımız zaman consolda AbortError hatası alırız
                    //Bu hatayı almamak adına AbortError verecek bir kullanım yaptığımız zaman if blogunun için çalışacak. normal bir kullanım ile bu hataya sebep olmadığımız
                    //zaman program akışı bozulmayacaktır.
                    if (error.name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                        setIsPending(false);
                        setError(error.message);
                    }
                })
        }, 1000);
        //Bunun yaptığı şey ise ilişkili olduğu getirme ne olursa olsun iptal etmektir.Cleanup
        return () => abortCont.abort();


        //url değeri ilk açılışta çalışacak daha sonra url değerinde bir değişiklik meydana gelene kadar bunun çalışmasını engelleriz.
    }, [url]);

    //Yukarıda ki işlemler tamamlandıktan sonra yukarıda state'lerimizde olan bilgileri return ederek Home.js'e yolluyoruz.
    return { data, isPending, error };

}

export default useFetch;