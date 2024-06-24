import { getThreadsBYCategory } from '../../services/threads'
const CategoriesThread = (props) => {
    const categoryId = props.categoryId;
    async function fetchThreads() {
        console.log(await getThreadsBYCategory(categoryId))
    }
    fetchThreads()
    return (
        <div className="text-white">
            {categoryId}
        </div>
    )
}

export default CategoriesThread;