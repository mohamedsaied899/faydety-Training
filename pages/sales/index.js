import ShowSales from '../../components/ShowSales'
import isAuth from '../../guards/isAuth'

const sales = () => {
    return (
        <div>
           <ShowSales />
        </div>
    )
}

export default isAuth(sales)