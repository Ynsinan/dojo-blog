
import BlogList from './BlogList';
import useFetch from './useFetch';
const Home = () => {


    //Burada oluşturduğumuz custom custom hook ile db.json verimizi aşağıdaki bağlantı ile useFetch.js'ye gönderiyoruz.
    //daha önceden useFetch.js de oluşturulan useStatein içindeki değişkenlerim blogs ve setBlogs şeklindeydi oraya ayrı bir yapı oluşturduktan sonra blogs ve setBlogs
    //değerlerini data ve setData olarak değiştirdim. Bunun anlamı her yerde bu veriyi değiştirmem gerektiğiydi ama 
    //Aşağıda gördüğünüz data:blogs tanımlaması bunların eş değer olduğunu gösterdiği için bulunduğumuz dosyada data ismini değiştirmeye gerek kalmadığını belirttik.

    const { error, isPending, data: blogs } = useFetch('http://localhost:8000/blogs');


    return (
        <div className="home">
            {/* error değeri true olduğu zaman sayfamıza bu hata mesajını bastıracaktır.Eğer false durumda ise ekrana hata mesajı gelmeyecektir.
                Default değerimiz "null" */}
            {error && <div>{error}</div>}


            {/* isPending değerini yukarıda useState içinde default olarak true verdik isPending değeri true oldukça ekrana Loading... yazısını yazdırır
                Fakat yukarıda useEffect içinde fetch yaptığımız bölümde json verilerini aldıktan sonra isPending değerini false yaptık bu işlemden sonra
                Loading... mesajı ekrandan kaybolacak ve Bloglist ekrana gelecektir. */}
            {isPending && <div>Loading...</div>}


            {/* blogs değeri true gelirse BlogList componenti ekrana yazılır. Eğer false gelirse BlogList componenti asla ekrana basılmaz. */}
            {/* blogs ve tittle adında propslarımızı Blogliste yolladık */}
            {blogs && <BlogList title='All Blogs!' blogs={blogs} />}

        </div>
    );
}

export default Home;