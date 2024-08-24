import { describe, test, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useApi } from "@/store/Api";
import App from "../../App.vue";

//mock the store
vi.mock("@/store/Api", () => ({
  useApi: vi.fn(),
}));

//enter the comp
describe("App", () => {
  let wrapper;
  let mockApiStore;

  //before each test
  beforeEach(() => {
    //create new store and activate it
    setActivePinia(createPinia());
    //reset the mock
    vi.resetAllMocks();

    //make a dummy store
    mockApiStore = {
      posts: [],
      error: null,
      fetchPosts: vi.fn(),
    };
    //initiate the store
    useApi.mockReturnValue(mockApiStore);
  });

  //posts to display:
  test("Test, displaying posts", async () => {
    //dummy values in the store
    mockApiStore.posts = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ];

    //mount the comp
    wrapper = mount(App);
    // wait the mount
    await wrapper.vm.$nextTick();

    //check the value output
    expect(wrapper.text()).toContain("Post 1");
    expect(wrapper.text()).toContain("Post 2");
    //check the data length
    expect(wrapper.findAll("li")).toHaveLength(2);
  });

  //no posts to display:
  test("Test, no posts", async () => {
    wrapper = mount(App);
    await wrapper.vm.$nextTick();

    //check if there is data:
    expect(wrapper.findAll("li")).toHaveLength(0);
    //the given message
    expect(wrapper.text()).toContain("No Posts To Check");
  });

  //error in fetching:
  test("Test, error message on error", async () => {
    //store an error message in the store:
    mockApiStore.error = "Failed to fetch posts";

    wrapper = mount(App);
    await wrapper.vm.$nextTick();

    //check on the given error if exist:
    expect(wrapper.find(".error-alert").exists()).toBe(true);
    //recieving the same error message:
    expect(wrapper.find(".error-alert").text()).toBe("Failed to fetch posts");
  });

  //test the fetching on mount
  test("Test, calling fetchPosts on mount", () => {
    wrapper = mount(App);

    //check if method is being called
    expect(mockApiStore.fetchPosts).toHaveBeenCalledTimes(1);
  });
});
